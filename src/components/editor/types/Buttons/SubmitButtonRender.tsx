import type { EntryTypesForms } from '../../../../models/Form'

interface SubmitButtonRenderProps {
    viewEntrie: EntryTypesForms
    index: number
}

export const SubmitButtonRender = ({ index, viewEntrie }: SubmitButtonRenderProps) => {
    return <>
        {
            index > -1 ? (
                <div key={"submitButton" + index} style={{ marginTop: "7px" }}>
                    <div className="pe-button pe-button__primary pe-button__full-width">
                        <button>
                            <span className="pe-button__text">
                                {String(viewEntrie?.components[index] != null && viewEntrie?.components[index].type == "submitButton" ?
                                    viewEntrie?.components[index].data.submitButton || "‎" : "‎")}
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ marginTop: "7px" }}>
                    <div className="pe-button pe-button__primary pe-button__full-width">
                        <button>
                            <span className="pe-button__text">
                                Submit
                            </span>
                        </button>
                    </div>
                </div>
            )
        }
    </>
}
