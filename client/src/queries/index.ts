import { gql } from 'apollo-boost';

/* Queries */
export const UrlScreenQuery = gql`
  query($url: String!) {
    urlScreen(url: $url) {
      screenWidth
      screenHeight
      image
    }
  }
`;

/* Mutations */
export const UrlBoxSelectionMutation = gql`
  mutation($url: String!, $coordinates: SectionBox!) {
    urlBoxSelection(url: $url, coordinates: $coordinates) {
      error
      message
    }
  }
`;
