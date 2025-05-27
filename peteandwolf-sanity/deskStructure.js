// deskStructure.js
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Regular document types
      ...S.documentTypeListItems().filter(item => !['aboutUs', 'homePage'].includes(item.getId())),
      
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

      // Singleton - Home
      S.listItem()
      .title('Home Page')
      .id('homePage')
      .child(
        S.editor()
          .id('homePage')
          .schemaType('homePage')
          .documentId('homePage')
      ),
    ])