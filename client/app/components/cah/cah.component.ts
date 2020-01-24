import { Component, OnInit } from '@angular/core'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'cah-root',
  templateUrl: './cah.component.html'
})
export class CahComponent implements OnInit {
  title = 'Cards Against Humanity'

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
          {
            allWhiteCards(first:10) {
              totalCount
              edgeCount
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
              edges {
                node {
                  text
                  genre {
                    Id
                    id
                    description
                    credit
                  }
                  Id
                  id
                }
              }
            }
          }
        `,
    })
      .valueChanges.subscribe(result => {
        console.log(result)
      })
  }
}
