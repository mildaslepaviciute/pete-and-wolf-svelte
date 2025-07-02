import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Orderable document types
      orderableDocumentListDeskItem({
        type: 'sonicIdProject',
        S,
        context,
        title: 'Sonic ID Projects (Orderable)'
      }),
      orderableDocumentListDeskItem({
        type: 'advertisingProject', 
        S,
        context,
        title: 'Advertising Projects (Orderable)'
      }),
      
      // Regular document types (excluding singletons and orderable types)
      ...S.documentTypeListItems().filter(item => 
        !['aboutUs', 'homePage', 'sonicIdProject', 'advertisingProject'].includes(item.getId())
      ),
      
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