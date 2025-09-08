export interface CardDimensions {
  width: string;
  height: string;
}

export const getCardDimensions = (cardType: string): CardDimensions => {
  const dimensions: Record<string, CardDimensions> = {
    'About Me': { width: '1000px', height: '1020px' },
    'About This Website': { width: '900px', height: '550px' },
    Planet: { width: '1100px', height: '650px' },
    'Mercury Crystals': { width: '1300px', height: '850px' },
    Flow: { width: '1000px', height: '1000px' },
    Spring: { width: '800px', height: '800px' },
    Mountain: { width: '1400px', height: '800px' },
    Tree: { width: '850px', height: '1000px' },
    'Sorting Visualization Tool': { width: '1000px', height: '1100px' },
    Invoicipedia: { width: '1000px', height: '1100px' },
    NeoWsTrackingApplication: { width: '1000px', height: '1100px' },
    MERNJWTAuth: { width: '1000px', height: '1100px' },
    TicketBookingSystem: { width: '1200px', height: '1100px' },
    'Understanding Microservices: Benefits, Use Cases, and Common Pitfalls': {
      width: '1000px',
      height: '1100px',
    },
    'Building Micrograd: A Minimal Autograd Engine': {
      width: '1000px',
      height: '1100px',
    },
    'Apache Kafka Global Overview': { width: '1000px', height: '1100px' },
    'Progress-Reports': { width: '700px', height: '500px' },
    Music: { width: '600px', height: '400px' },
  };

  // Default dimensions for any card type not explicitly defined
  return dimensions[cardType] || { width: '600px', height: '400px' };
};
