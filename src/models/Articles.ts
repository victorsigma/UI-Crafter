export interface Article {
    id: string;
    title: string;
    elements: Array<ArticleItem>;
}


export interface ArticleItem {
    type: "text" | "code" | "image";
    content: "</br>" | string;
}