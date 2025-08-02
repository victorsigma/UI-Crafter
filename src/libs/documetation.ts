import type { Article } from "../models/Articles";

export const documentation: Array<Article> = [
    {
        "id": "what-is",
        "title": "What is UI Crafter?",
        "elements": [
            {
                "type": "text",
                "content": "UI Crafter is a web-based tool that allows you to create graphical interfaces for Minecraft Bedrock using the API §s@minecraft/server-ui§sr."
            }
        ]
    },
    {
        "id": "installation",
        "title": "Installation",
        "elements": [
            {
                "type": "text",
                "content": "No installation is required. Simply access the application from your browser."
            }
        ]
    },
    {
        "id": "basic-use",
        "title": "Basic use",
        "elements": [
            {
                "type": "text",
                "content":
                    `<p>1. Select the type of interface you want to create (e.g. modal form or panel)..</p>
                <p>2. Add elements such as buttons, text or selectors.</p>
                <p>3. Export the generated code and paste it into your Minecraft Bedrock script.</p>`
            }
        ]
    },
    {
        "id": "make-project",
        "title": "How to make a project",
        "elements": [
            {
                "type": "text",
                "content": "To create a new project, click on the 'Make new project' button in the top right corner. This will open a dialog where you can enter the project name and initial view type."
            },
            {
                "type": "image",
                "content": "assets/images/docs/make-project-1.jpeg"
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": "After entering the project name and selecting the view type, click 'Create Project'. This will generate a new project with the specified name and view type."
            },
            {
                "type": "image",
                "content": "assets/images/docs/make-project-2.jpeg"
            }
        ]
    },
    {
        "id": "project-structure",
        "title": "Project Structure",
        "elements": [
            {
                "type": "text",
                "content": "The project structure consists of views and functions. Each view is a separate file that contains the UI elements and logic for that view. Functions are used to handle events and interactions within the views."
            },
            {
                "type": "image",
                "content": "assets/images/docs/project-structure-1.jpeg"
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": "The views are organized with components that can be reused for especific view types. This allows for a modular approach to building UIs, making it easier to manage and update the project."
            },
            {
                "type": "image",
                "content": "assets/images/docs/project-structure-2.jpeg"
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": "Each view inncludes a view name, view reference and parameters. The view name is used to identify the view, the view reference is a identifier for the view, and parameters are used to pass data to the view."
            },
            {
                "type": "image",
                "content": "assets/images/docs/project-structure-3.jpeg"
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": "Functions also have the same basic properties as views such as the function name, the function identifier and its parameters. But functions can't have components, they are used a javascript functions that can be called from views with buttons components."
            },
            {
                "type": "image",
                "content": "assets/images/docs/project-structure-4.jpeg"
            }
        ]
    },
    {
        "id": "editor-tools",
        "title": "Editor Tools",
        "elements": [
            {
                "type": "text",
                "content": "Editor contains five sections: Views/Functions, Preview, Nodes, View/Function/Components Properties and Tool Bar."
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": "The Views/Functions section allows you to manage the views and functions of your project. You can add and remove views and functions, as add and remove components to views."
            },
            {
                "type": "image",
                "content": "assets/images/docs/editor-tools-1.jpeg"
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": "Preview section allows you to see how your views will look in the game. You can interact with the views and see how the components work."
            },
            {
                "type": "image",
                "content": "assets/images/docs/editor-tools-2.jpeg"
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": `The nodes section displays a panel with elements representing connections between views and functions, as well as links between different views. 
                This section allows you to easily manipulate these connections by means of the node connectors. In addition, it is possible to delete connections by simply selecting them and pressing the ‘Delete’ key on the keyboard.`
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": `The nodes representing the views have the shape of a small form, and in case they have connection buttons, these are shown inside the node to facilitate connections. Functions are represented by a dark purple node, which shows the function parameters.
                In both types of nodes, the name of the view or function they represent is displayed, as well as its type.`
            },
            {
                "type": "image",
                "content": "assets/images/docs/editor-tools-3.jpeg"
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": `The properties section contains all the editable attributes of the selected element (view, function or component), 
                allowing you to customize these attributes for further customization of the element.`
            },
            {
                "type": "image",
                "content": "assets/images/docs/editor-tools-4.jpeg"
            },
            {
                "type": "text",
                "content": "</br>"
            },
            {
                "type": "text",
                "content": `The toolbar is currently divided into two sections: the ‘File’ section and the ‘Edit’ section. The ‘File’ section contains everything related to exporting and saving the project. 
                On the other hand, the ‘Edit’ section groups together all the options for adding, deleting, undoing and making modifications to views and functions.`
            },
            {
                "type": "image",
                "content": "assets/images/docs/editor-tools-5.jpeg"
            },
            {
                "type": "image",
                "content": "assets/images/docs/editor-tools-6.jpeg"
            },
            {
                "type": "image",
                "content": "assets/images/docs/editor-tools-7.jpeg"
            }
        ]
    },
    {
        "id": "add-views",
        "title": "Add Views",
        "elements": [
            {
                "type": "text",
                "content": "To add a new view, click on the 'Add View' button in the section editor of the tool bar. This will open a dialog where you can enter the view name and select the view type."
            },
            {
                "type": "image",
                "content": "assets/images/docs/add-view.jpeg"
            }
        ]
    },
    {
        "id": "add-functions",
        "title": "Add Functions",
        "elements": [
            {
                "type": "text",
                "content": "To add a new function, click on the 'Add Function' button in the section editor of the tool bar. This will open a dialog where you can enter the function name."
            },
            {
                "type": "image",
                "content": "assets/images/docs/add-function.jpeg"
            }
        ]
    },
    {
        "id": "add-components",
        "title": "Add Commponents",
        "elements": [
            {
                "type": "text",
                "content": "To add a component, click on the 'Add Component' button in the context menu of the view entry. This will open a dialog where you can select the component type."
            },
            {
                "type": "image",
                "content": "assets/images/docs/add-component.jpeg"
            }
        ]
    },
    {
        "id": "node-conections",
        "title": "Node Connections",
        "elements": [
            {
                "type": "text",
                "content": "To connect nodes, simply drag from the output of one node to the input of another. This will create a connection between the two nodes. You can also delete connections by selecting them and pressing the 'Delete' key on your keyboard."
            },
            {
                "type": "image",
                "content": "assets/images/docs/node-conection.gif"
            }
        ]
    },
    {
        "id": "output-example",
        "title": "Output example",
        "elements": [
            {
                "type": "code",
                "content": `const form = new MessageFormData()
    .title("Welcome to UI Crafter")
    .body("Choose an option:")
    .button1("Play")
    .button2("Exit");
    
form.show(player);`
            }
        ]
    }/*,
    {
        "id": "contribuir",
        "title": "Contribuir",
        "elements": [
            {
                "type": "text",
                "content": "Si deseas contribuir con nuevas funciones o reportar errores, visita nuestro repositorio en GitHub."
            }
        ]
    }*/
]


/*  Example
    {
        "id": "string",
        "title": "string",
        "elements": [
            {
                "type": "image",
                "content": "string(url)"
            },
            {
                "type": "code",
                "content": "string"
            },
            {
                "type": "text",
                "content": "string"
            }
        ]
    }
*/