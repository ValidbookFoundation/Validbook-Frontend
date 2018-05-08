export const filterSupportHumanClaimSignature = (card, auth_user_card_address) => {
  if (card && card.claims) {
    const supports_human_claim = card.claims.filter(claim => claim.type === 'I am human')[0];
    let supporter_card = null;

    if (supports_human_claim && supports_human_claim.supports) {
      supporter_card = supports_human_claim.supports
        .filter(support => support.support_address === auth_user_card_address)[0];
    }

    return supporter_card ? supporter_card.support_address : null;
  }

  return null;
};

export const filterRevokedSupportSignature = (claims, auth_user_card_address) => {
  return claims.map(claim => {
    if (claim.type === 'I am human' && claim.supports) {
      return Object.assign({}, claim, {
        supports: claim.supports.filter(support => support.support_address !== auth_user_card_address)
      });
    }
    
    return claim;
  });
};
