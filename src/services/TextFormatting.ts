import { MINECRAFT_COLORS } from "../libs/definitions";

export class TextFormatting {
    private convertColorCodes(text: string): string {
        let formattedText = text;

        // Replasa los Minecraft color codes con su correspondiente HTML/CSS
        Object.keys(MINECRAFT_COLORS).forEach(code => {
            const colorClass: string = MINECRAFT_COLORS[code];
            const regex = new RegExp(code, 'g');
            formattedText = formattedText.replace(regex, `<span class="${colorClass}">`);
        });

        // Cierra todos los spans abiertos
        formattedText = formattedText.replace(/§r/g, '</span>');
        formattedText = formattedText.replace(/§sr/g, '</code>');
        formattedText = formattedText.replace(/§s/g, '<code>');

        return formattedText;
    }

    public formatText(text: string): string {
        return this.convertColorCodes(text);
    }
}