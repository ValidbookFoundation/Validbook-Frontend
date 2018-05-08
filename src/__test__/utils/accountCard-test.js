import { expect } from 'chai';
import { 
  filterSupportHumanClaimSignature,
  filterRevokedSupportSignature
} from '../../utils/accountCard';

describe('account card utils', () => {
  describe('filterSupportHumanClaimSignature', () => {
    it('when claims account card is null', () => {
      const card = {
        claims: null
      };
      const auth_user_card = '123';
      const support_address = filterSupportHumanClaimSignature(card, auth_user_card);

      expect(support_address).to.equal(null);
    });

    it('when account card have claims supports, but auth_user not support this card', () => {
      const card = {
        claims: [
          {
            type: 'I am human',
            supports: [
              {
                support_address: '234'
              }, {
                support_address: '235'
              }
            ]
          }
        ]
      };
      const auth_user_card = '123';
      const support_address = filterSupportHumanClaimSignature(card, auth_user_card);

      expect(support_address).to.equal(null);
    });
    
    it('when claims account card have supports, auth_user support this card', () => {
      const card = {
        claims: [
          {
            type: 'I am human',
            supports: [
              {
                support_address: '234'
              }, {
                support_address: '123'
              }
            ]
          }
        ]
      };
      const auth_user_card = '123';
      const support_address = filterSupportHumanClaimSignature(card, auth_user_card);

      expect(support_address).to.equal('123');
    });
  });

  describe('filterRevokedSupportSignature', () => {
    it('auth_user supported this card', () => {
      const claims = [
        {
          type: 'I am human',
          supports: [
            {
              support_address: '234'
            }, {
              support_address: '123'
            }
          ]
        }
      ];
      const auth_user_card = '123';
      const claims_map = filterRevokedSupportSignature(claims, auth_user_card);
      
      expect(claims_map[0].supports.length).to.equal(1);
    });
  });
});
