import { expect } from 'chai';
import {
  parsePublicAddress,
  parseRandomNumber,
  parseUserSlug,
  parseBookSlug,
  parseStoryIdFromBookPage
} from '../../utils/url_parsing';

describe('url parsing utils', () => {
  describe('parsePublicAddress', () => {
    it('when url without random number', () => {
      const url = '/test3.test3/account-card/0xe157c18C259d6940C2c0314E2D11cc5a9C9AA410';
      const public_address = parsePublicAddress(url);

      expect(public_address).to.equal('0xe157c18C259d6940C2c0314E2D11cc5a9C9AA410');
    });

    it('when url with random number', () => {
      const url = '/test3.test3/account-card/0xe157c18C259d6940C2c0314E2D11cc5a9C9AA410/32452342';
      const public_address = parsePublicAddress(url);

      expect(public_address).to.equal('0xe157c18C259d6940C2c0314E2D11cc5a9C9AA410');
    });
  });

  describe('parseRandomNumber', () => {
    it('when url without random number', () => {
      const url = '/test3.test3/account-card/0xe157c18C259d6940C2c0314E2D11cc5a9C9AA410';
      const public_address = parseRandomNumber(url);

      expect(public_address).to.equal(null);
    });

    it('when url with random number', () => {
      const url = '/test3.test3/account-card/0xe157c18C259d6940C2c0314E2D11cc5a9C9AA410/32452342';
      const public_address = parseRandomNumber(url);

      expect(public_address).to.equal('32452342');
    });
  });

  describe('parseUserSlug', () => {
    it('when url with user slug', () => {
      const url = '/test3.test3/account-card/0xe157c18C259d6940C2c0314E2D11cc5a9C9AA410';
      const user_slug = parseUserSlug(url);

      expect(user_slug).to.equal('test3.test3');
    });

    it('when url only with user slug', () => {
      const url = '/test3.test3/account-card/0xe157c18C259d6940C2c0314E2D11cc5a9C9AA410/32452342';
      const user_slug = parseUserSlug(url);

      expect(user_slug).to.equal('test3.test3');
    });
  });

  describe('parseBookSlug', () => {
    it('when url without book slug', () => {
      const url = '/jimbo.fry/books';
      const book_slug = parseBookSlug(url);

      expect(book_slug).to.equal(null);
    });

    it('when url without book slug', () => {
      const url = '/jimbo.fry/books/';
      const book_slug = parseBookSlug(url);

      expect(book_slug).to.equal(null);
    });

    it('when url with book slug', () => {
      const url = '/jimbo.fry/books/148-life';
      const book_slug = parseBookSlug(url);

      expect(book_slug).to.equal('148-life');
    });
    
    it('when url with book slug', () => {
      const url = '/jimbo.fry/books/148-life/2134';
      const book_slug = parseBookSlug(url);
  
      expect(book_slug).to.equal('148-life');
    });
  });
  
  // describe('parseStoryIdFromBookPage', () => {
  //   it('when url without book slug', () => {
  //     const url = '/jimbo.fry/books';
  //     const book_slug = parseStoryIdFromBookPage(url);

  //     expect(book_slug).to.equal(null);
  //   });

  //   it('when url without book slug', () => {
  //     const url = '/jimbo.fry/books/';
  //     const book_slug = parseStoryIdFromBookPage(url);

  //     expect(book_slug).to.equal(null);
  //   });

  //   it('when url with book slug', () => {
  //     const url = '/jimbo.fry/books/148-life';
  //     const book_slug = parseStoryIdFromBookPage(url);

  //     expect(book_slug).to.equal('148-life');
  //   });
  // });
});

