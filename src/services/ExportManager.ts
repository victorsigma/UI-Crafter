import type { EntryTypesForms } from '../models/Form';
import { type ProjectModel } from '../models/ProjectModel';
import { saveFile, saveZip } from '../libs/fileManager';
import { asParamString, toCamelCase, toSnakeCase } from '../libs/stringManager';
import JSZip from 'jszip';

import FormBase from '../assets/js/FormBase.d.js?raw'
import ReadMe from '../assets/others/README.md?raw'
import { toast } from 'react-toastify';

export class ExportManager {
	constructor(private project: ProjectModel) { }

	public exportProject = () => {
		saveFile(toSnakeCase(`${this.project.name}.uc`), JSON.stringify(this.project))

		toast.success("Project exported successfully!")
	}

	public exportAllV1 = () => {
		const zip = new JSZip();

		this.project.data.entries.map((entry) => {
			if (entry.type == "Function") {
				zip.folder("utils")?.file(`${entry.formRef}.js`, entry.content)
			} else {
				zip.folder("views")?.folder(entry.formRef)?.file(`${entry.formRef}.js`, entryFormToJSV1(entry))
			}
		})

		zip.file("README.md", ReadMe)

		zip.generateAsync({ type: "blob" }).then(content => {
			saveZip(toSnakeCase(`${this.project.name}.zip`), content);
			toast.success("Project exported successfully!");
		});
	}
}




const entryFormToJSV1 = (entry: EntryTypesForms) => {
	let code = FormBase;

	code = code.replace("genericFormType", `${entry.type}Data`)

	let codeContent = `const ${toCamelCase(entry.type)} = new ${entry.type}Data();`

	let genericImport = "";

	let showContent = `${toCamelCase(entry.type)}.show(${entry.params[0] != undefined ? entry.params[0] : ""}).then((formData) => {
        if(formData.canceled) return -1;
        showGenericContent
    }).catch((error) => {
        log("Failed to show form: " + error);
        return -1;
    });`

	let showGenericContent = "";

	let buttonIndex = 0;

	entry.components.forEach((component) => {
		const componentClone = structuredClone(component);

		let codeComponet = `${toCamelCase(entry.type)}.${componentClone.type}(params)`
		switch (componentClone.type) {
			case "body":
			case "title":
			case "submitButton":
				codeComponet = codeComponet.replace("params", asParamString(componentClone.data).replace(`"{`, "{").replace(`}"`, "}"))
				break;
			case "slider":
				{
					let newData: any = { ...componentClone.data, valueStep: componentClone.data.sliderOptions.valueStep }
					if (componentClone.data.sliderOptions.defaultValue != undefined) {
						newData = { ...newData, defaultValue: componentClone.data.sliderOptions.defaultValue }
					}

					delete newData.sliderOptions;

					codeComponet = codeComponet.replace("params", asParamString(newData))
				}
				break;
			case "textField":
				{
					let newData: any = { ...componentClone.data }
					if (componentClone.data.textFieldOptions?.defaultValue != undefined) {
						newData = { ...newData, defaultValue: componentClone.data.textFieldOptions.defaultValue }
					}
					delete newData.textFieldOptions;
					codeComponet = codeComponet.replace("params", asParamString(newData))
				}
				break;
			case "toggle":
				{
					const newData: any = {
						label: componentClone.data.label
					}
					codeComponet = codeComponet.replace("params", asParamString(newData))
				}
				break;
			case "dropdown":
				{
					let newData: any = { ...componentClone.data }
					if (componentClone.data.dropdownOptions?.defaultValueIndex != undefined) {
						newData = { ...newData, defaultValueIndex: componentClone.data.dropdownOptions.defaultValueIndex }
					}
					delete newData.dropdownOptions;

					codeComponet = codeComponet.replace("params", asParamString(newData))
				}
				break;
			case "button":
			case "button1":
			case "button2":
				{
					const { functionRef, typeOfRef, ...restData } = componentClone.data;

					if (functionRef) {
						const importPath = typeOfRef === "Function"
							? `../../utils/${functionRef}`
							: `../${functionRef}/${functionRef}`;

						genericImport += `\nimport { ${functionRef} } from "${importPath}"`;

						showGenericContent += `${buttonIndex == 0 ? "" : "\t\n"}if(formData.selection === ${buttonIndex}) { return ${functionRef}() }`;
					} else {
						showGenericContent += `${buttonIndex == 0 ? "" : "\t\n"}if(formData.selection === ${buttonIndex}) { return }`;
					}

					buttonIndex++;
					codeComponet = codeComponet.replace("params", asParamString(restData));
				}
				break;
		}
		codeContent = `${codeContent}\n\t${codeComponet}`
	})

	showContent = showContent.replace("showGenericContent", showGenericContent)

	codeContent = `${codeContent}\n\t`
	codeContent = `${codeContent}\n\t\n\t${showContent}`

	code = code.replace("formGenericName", entry.name)
		.replace("formGenericRef", entry.formRef)
		.replace("genericParams", entry.params.join(", "))
		.replace("genericContent", codeContent)
		.replace("genericImport", genericImport)

	console.log(code)

	return code;
}