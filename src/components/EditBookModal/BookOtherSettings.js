import React, { Component } from 'react';
import { SelectionControlGroup, SelectionControl } from 'react-md';

class BookOtherSettings extends Component {
  render() {
    return (
      <div className="book_access_settings">
        <h2>Other Settings</h2>
        <SelectionControlGroup
          id="other_settings"
          name="selection-controls"
          type="radio"
          onChange={(e) => this.changeFiled(e, 'delete_stories')}
          controls={[
            { 
              label: 'By default show stories in the book in cards view', 
              value: 'cards_view'
            }, { 
              label: 'By default show stories in the book in blog view', 
              value: 'blog_view'
            }
          ]}
        />
        <SelectionControl
          id="parent_book"
          name="selection-controls"
          type="checkbox"
          label="Automatically export stories from the book into its parent book"
        />
        <SelectionControl
          id="subbooks"
          name="selection-controls"
          type="checkbox"
          label="Automatically import stories into the book from its subbooks"
        />
      </div>
    );
  }
}

export default BookOtherSettings;
