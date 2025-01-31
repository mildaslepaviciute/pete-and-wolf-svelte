// deskStructure.js
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Regular document types
      ...S.documentTypeListItems().filter(item => !['aboutUs', 'sonicIdPage'].includes(item.getId())),
      
      // Singleton - About Us
      S.listItem()
        .title('About Us Page')
        .id('aboutUs')
        .child(
          S.editor()
            .id('aboutUs')
            .schemaType('aboutUs')
            .documentId('aboutUs')
        ),

      // Singleton - Sonic ID
      S.listItem()
        .title('Sonic ID Page')
        .id('sonicIdPage')
        .child(
          S.editor()
            .id('sonicIdPage')
            .schemaType('sonicIdPage')
            .documentId('sonicIdPage')
        ),
    ])