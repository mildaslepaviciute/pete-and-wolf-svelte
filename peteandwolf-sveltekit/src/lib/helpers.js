export function renderBlocks(blocks, sizeBased = false) {
    const text = blocks?.map(block => {
        if (block._type === 'block') {
            if (sizeBased) {
                // Get the block style (h1, h2, p, etc.)
                const style = block.style || 'normal';
                
                // Get the text content
                const content = block.children?.map(child => {
                    let text = child.text || '';
                
                    if (child.marks && child.marks.length > 0) {
                        // Find any matching markDefs for links
                        const linkMark = block.markDefs?.find(def => child.marks.includes(def._key));
                
                        // Add formatting based on marks
                        child.marks.forEach(mark => {
                            console.log(mark)
                            switch (mark) {
                                case 'strong':
                                    text = `<strong>${text}</strong>`;
                                    break;
                                case 'em':
                                    text = `<em>${text}</em>`;
                                    break;
                                case 'underline':
                                    text = `<u>${text}</u>`;
                                    break;
                                case 'strike-through':
                                    text = `<strike>${text}</strike>`;
                                    break;
                            }
                        });
                
                        // Apply link if found in markDefs
                        if (linkMark && linkMark._type === 'link') {
                            text = `<a href="${linkMark.href}" target="_blank" rel="noopener">${text}</a>`;
                        }
                    }
                    
                    return text;
                }).join('');
                
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
                return `<div class="${fontClass} line-h-12">${content}</div>`;
            } else {
                return block.children?.map(child => child.text).join('');
            }
        }
        return '';
    }).join('\n');
    
    return text?.replace(/\n/g, '<br>');
}