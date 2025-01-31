export function renderBlocks(blocks) {
    const text = blocks?.map(block => {
        if (block._type === 'block') {
            return block.children?.map(child => child.text).join('');
        }
        return '';
    }).join('\n');
    
    return text?.replace(/\n/g, '<br>');
}