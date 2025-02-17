export function renderBlocks(blocks) {
    const text = blocks?.map(block => {
        if (block._type === 'block') {
            // Get the block style (h1, h2, p, etc.)
            const style = block.style || 'normal';
            
            // Get the text content
            const content = block.children?.map(child => child.text).join('');
            
            // Map heading styles to font classes
            const fontClassMap = {
                'h1': 'font-1',
                'h2': 'font-2',
                'h3': 'font-3',
                'h4': 'font-4',
                'h5': 'font-5',
                'h6': 'font-6',
                'normal': 'font-6' // default font size for normal paragraphs
            };

            // Get the appropriate font class
            const fontClass = fontClassMap[style] || 'font-6';
            
            // Return paragraph with appropriate font class
            return `<p class="${fontClass} line-h-12">${content}</p>`;
        }
        return '';
    }).join('\n');
    
    return text?.replace(/\n/g, '<br>');
}