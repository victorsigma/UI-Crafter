import type { RawMessage } from "./RawMessage"

interface Form {
	type: string,
	name: string,
	formRef: string,
	params: string[]
}

export type EntryTypes = (ActionForm | MessageForm | ModalForm | McFunction)

export type EntryTypesForms = (ActionForm | MessageForm | ModalForm)

export type EntryTypesWithComponents = {
    type: "ActionForm" | "MessageForm" | "ModalForm";
    name: string;
    formRef: string;
    params: string[];
    components: FormComponents[]; // Allow all possible components
}


export interface ActionForm extends Form {
	type: "ActionForm"
	components: Array<ActionComponents>
}

export interface MessageForm extends Form {
	type: "MessageForm"
	components: Array<MessageComponents>
}

export interface ModalForm extends Form {
	type: "ModalForm"
	components: Array<ModalComponents>
}

export interface McFunction extends Form {
	type: "Function"
	content: string
}


export const ActionFormRules = {
	"body": 1,
	"button": Infinity,
	"title": 1
}

export const MessageFormRules = {
	"body": 1,
	"button1": 1,
	"button2": 1,
	"title": 1
}

export const ModalFormRules = {
	"dropdown": Infinity,
	"slider": Infinity,
	"submitButton": 1,
	"textField": Infinity,
	"toggle": Infinity,
	"title": 1
}

export const ComponentList = {
	"ActionForm": [
		"Body", "Button", "Title"
	],
	"MessageForm": [
		"Body", "Button1", "Button2", "Title"
	],
	"ModalForm": [
		"Dropdown", "Slider", "SubmitButton", "TextField", "Toggle", "Title"
	],
	"Function": [
		""
	]
}

export type FormComponents = (ActionComponents | MessageComponents | ModalComponents)

export type ActionComponents = (Body | Button | Divider | Text | Title)

export type MessageComponents = (Body | ButtonMessage | Title)

export type ModalComponents = (Divider | Dropdown | Text | Slider | SubmitButton | TextField | Title | Toggle)



export interface SelectEntrie {
	entrie: number, component: number | null
}



export interface Body {
	type: "body",
	data: {
		bodyText?: string | RawMessage
	}
}


export type ButtonComponents = (Button | ButtonMessage | SubmitButton);

export interface Button {
	type: "button",
	data: {
		text: string | RawMessage
		iconPath?: string
		functionRef?: string
		typeOfRef?: string
	}
}

export interface ButtonMessage {
	type: "button1" | "button2",
	data: {
		text: string | RawMessage
		functionRef?: string
		typeOfRef?: string
	}
}

export interface SubmitButton {
	type: "submitButton",
	data: {
		submitButton: string | RawMessage
	}
}

interface Divider {
	type: "divider"
}

export interface Dropdown {
	type: "dropdown",
	data: {
		label: string | RawMessage
		items: (string | RawMessage)[]
		dropdownOptions?: {
			defaultValueIndex?: number
			tooltip?: string | RawMessage
		}
	}
}


export interface Text {
	type: "label" | "header",
	data: {
		text: string | RawMessage
	}
}

export interface Slider {
	type: "slider",
	data: {
		label: string | RawMessage
		minimumValue: number
		maximumValue: number
		sliderOptions: {
			defaultValue?: number
			tooltip?: string | RawMessage
			valueStep: number
		}
	}
}

export interface TextField {
	type: "textField",
	data: {
		label: string | RawMessage
		placeholderText: string | RawMessage
		textFieldOptions?: {
			defaultValue?: string | RawMessage
			tooltip?: string | RawMessage
		}
	}
}


export interface Title {
	type: "title",
	data: {
		titleText: string | RawMessage
	}
}

export interface Toggle {
	type: "toggle",
	data: {
		label: string | RawMessage
		toggleOptions?: {
			defaultValue?: boolean
			tooltip?: string | RawMessage
		}
	}
}

export const baseBody = {
	type: "body",
	data: {
		bodyText: "",
	},
} as const;

export const baseButton = {
	type: "button",
	data: {
		text: "",
	},
} as const;

export const baseButton1 = {
	type: "button1",
	data: {
		text: "",
		functionRef: ""
	},
} as const;

export const baseButton2 = {
	type: "button2",
	data: {
		text: ""
	},
} as const;

export const baseSubmitButton = {
	type: "submitButton",
	data: {
		submitButton: ""
	},
} as const;

export const baseDivider = {
	type: "divider",
} as const;

export const baseDropdown = {
	type: "dropdown",
	data: {
		label: "",
		items: [],
		dropdownOptions: {
			defaultValueIndex: 0,
			tooltip: "",
		},
	},
} as const;

export const baseText = (type: "header" | "label") => {
	return {
		type,
		data: {
			text: "",
		},
	} as const
};

export const baseSlider = {
	type: "slider",
	data: {
		label: "",
		minimumValue: 0,
		maximumValue: 100,
		sliderOptions: {
			valueStep: 1,
		},
	},
} as const;

export const baseTextField = {
	type: "textField",
	data: {
		label: "",
		placeholderText: "",
		textFieldOptions: {
			defaultValue: "",
			tooltip: "",
		},
	},
} as const;

export const baseTitle = {
	type: "title",
	data: {
		titleText: "",
	},
} as const;

export const baseToggle = {
	type: "toggle",
	data: {
		label: "",
		toggleOptions: {
			defaultValue: false,
			tooltip: "",
		},
	},
} as const;
