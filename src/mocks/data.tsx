import {
  sliderImageGirlBlue,
  sliderImageGirlRed,
  sliderImageManInYellow,
  sliderImageManWithCamera,
} from "@/assets";

import {
  FaqItemType,
  GridItemType,
  ITypeOnboardingSliderItem,
  ITypeSubscriptionCard,
  SelectItemsType,
} from "@/types/constants";
import { OptionGroupType } from "@/components/forms/customSelect";

export const signupSelectItems: SelectItemsType = [
  {
    heading: "How did you hear about us?",
    items: [
      {
        key: "wordOfMouth",
        value: "Word of mouth",
      },
      {
        key: "posters",
        value: "Posters",
      },
      {
        key: "twitter",
        value: "Twitter",
      },
      {
        key: "instagram",
        value: "Instagram",
      },
      {
        key: "facebook",
        value: "Facebook",
      },
    ],
  },
];
export const identificationsMeans: OptionGroupType[] = [
  {
    groupName: "Means of Identification",
    options: [
      {
        name: "nin",
        value: "NIN",
      },
      // {
      //   name: "votersCard",
      //   value: "Voter's card",
      // },
      // {
      //   name: "driversLicense",
      //   value: "Driver's license",
      // },
      // {
      //   name: "passport",
      //   value: "Passport",
      // },
    ],
  },
];

export const requiredSnaps: {
  name: string;
  snaps: string[];
}[] = [
  {
    name: "nin",
    snaps: ["Front"],
  },
  // {
  //   name: "votersCard",
  //   snaps: ["Front", "Back"],
  // },
  // {
  //   name: "driversLicense",
  //   snaps: ["Front", "Back"],
  // },
  // {
  //   name: "passport",
  //   snaps: ["Front"],
  // },
];

export const gridData: GridItemType[] = [
  {
    id: 1,
    header: "Go digital and set up your online business store",
    paragraph:
      "Set up your online business page in less than 5 minutes and start showcasing your products/services to the right customers. Go digital!",
  },
  {
    id: 2,
    header: "Geo-location at your service",
    paragraph:
      "With the power of geo-location at your fingertips, you are a second or minute away from getting discovered by all the right customers",
  },
  {
    id: 3,
    header: "Receive and manage orders, and make more profit",
    paragraph:
      "Manage and process all your orders & logistics from one place. From start to finish, enjoy doing business the easy way ",
  },
  {
    id: 4,
    header: "Shop fast & keep up with vendors you follow",
    paragraph:
      "Find new favourite vendors from a pool of several categories and favourite them to keep up with them and revisit them often.",
  },
  {
    id: 5,
    header: "Geo-location at your convenience",
    paragraph:
      "With the power of geo-location at your fingertips, you are a second or minute away from finding all the coolest vendors right around your neighbourhood and beyond.",
  },
  {
    id: 6,
    header: "Much more to come!",
    paragraph:
      "There’s so much more to come. We’re simplifying retail experience like never before so create your account now to get started!",
  },
];

export const faqData: FaqItemType[] = [
  {
    id: 1,
    header: "What is Bundo?",
    paragraph:
      "Bundo is a retail & ecommerce technology company simplifying retail by bridging the  gaps between small/medium business owners and regular customers. We are helping to further digitize retail and make it easier for everyday people to buy and sell beyond the challenges of location, visibility, accessibility and resources.",
  },
  {
    id: 2,
    header: "What kind of businesses can use Bundo?",
    paragraph:
      "Any small to medium businesses can make use of Bundo to showcase their products, get found by customers, receive orders on purchases from their products/services, and withdraw their earnings from their wallet.",
  },
  {
    id: 3,
    header: "Must I have a CAC document to use Bundo?",
    paragraph:
      "CAC document is optional. However it is one of the options you can select to verify your Business. Other options to choose from include NIN, Driver’s license or International passport.",
  },
  {
    id: 4,
    header: "Who is a ‘Vendor’ on Bundo?",
    paragraph:
      "A Vendor is anyone who sells on Bundo. Signing up as a Vendor means that you have or run a business that you want to grow, market and make more profit from.",
  },
  {
    id: 5,
    header: "Who is a ‘Customer’ on Bundo?",
    paragraph:
      "A customer is anyone who buys from vendors on Bundo. Signing up as a Customer means that you want to discover and buy from vendors offering products and services",
  },
  {
    id: 6,
    header: "What do I need to do for customers find my business easily?",
    paragraph:
      "To enjoy customer visibility, you need to set up a vendor profile, create a virtual marketplace (Business page) and pin your location to the Map. With this, your customers would find your business efficiently.",
  },
  {
    id: 7,
    header: "What kind of products can I buy on Bundo?",
    paragraph:
      "Bundo has a wide pool of categories ranging from fashion, thrift-wear, sports, food, etc. so you can search for a product under categories or on the marketplace.",
  },
  {
    id: 8,
    header: "Is Bundo free to use?",
    paragraph: `Bundo is free to use. However, there are 3 plans you can choose from as a vendor. 
The free plan, the basic plan and the premium plan. Each of these plans have their own benefits and you can see the differences after you have created an account.`,
  },
  {
    id: 9,
    header: "What is the Bundo WhatsApp Marketplace about?",
    paragraph: `Bundo WhatsApp Marketplace is a beta model of our e-commerce Marketplace, where vendors and customers can connect with each other in location-based groups (Lagos, Port-Harcourt, Enugu and Abuja)`,
  },
  {
    id: 10,
    header: "How can I join the team?",
    paragraph: (
      <small className="w-full">
        {`You can check for open roles at Bundo `}
        <a href="" target="_blank" className=" font-bold underline">
          here.
        </a>
      </small>
    ),
  },
];

export const subscriptionPlans: ITypeSubscriptionCard[] = [
  {
    plan: "FREE",
    badge: "Business Acquaintance",
    price: 0,
    planOffers: [
      "Free shareable business page ",
      "Access to 15 product tiles",
      "Upload and manage multiple products",
      "Business page listing on Bundo Marketplace",
      "Business page reviews",
      "Customer care support",
    ],
  },
  {
    plan: "BASIC",
    badge: "Business Friendly",
    price: 1500,
    planOffers: [
      "Free shareable business page",
      "50 product tiles",
      "Upload and manage multiple products",
      "Business page listing on Bundo Marketplace",
      "Receive new orders from customers",
      "Manage and process orders",
      "Business page reviews",
      "Customer care support",
    ],
  },
  {
    plan: "PREMIUM",
    badge: "Business Bestie",
    price: 3000,
    planOffers: [
      "Free shareable business page",
      "Unlimited product tiles",
      "Upload and manage multiple products",
      "Business page listing on Bundo Marketplace",
      "Receive new orders from customers",
      "Manage and process orders",
      "Page and Product Ads",
      "Business page recommendation to customers",
      "Business page reviews",
      "Customer care support",
    ],
  },
];

export const buyersOnboardingSliderContents: ITypeOnboardingSliderItem[] = [
  {
    heading: "Put your Business in front of a wide audience - near and far",
    subheading: `Put your business where the customers are. 
Set up a free digital business page for you to showcase your products and services. Go digital!`,
    src: sliderImageManWithCamera,
  },
  {
    heading: "Find any category of vendors and businesses in your location",
    subheading: `With our geolocation technology, discover vendors around you effortlessly and find a wide range of products you will love`,
    src: sliderImageGirlBlue,
  },
  {
    heading: "Set up your business and let customers rush you ",
    subheading: `What’s better than having a physical store at a market? Having a digital store on a wider market! Be among other businesses on our wide marketplace and stand out to a large audience!`,
    src: sliderImageManInYellow,
  },
  {
    heading: "Enjoy easy retail from the comfort of your device",
    subheading: `Enjoy easier retail from the comfort of your device - no matter where you are. Get started now!`,
    src: sliderImageGirlRed,
  },
];

export const vendorsOnboardingSliderContents: ITypeOnboardingSliderItem[] = [
  {
    heading: "Put your Business in front of a wide audience - near and far",
    subheading: `Instantly convert between currencies`,
    src: sliderImageManWithCamera,
  },
  {
    heading: "Put your Business in front of a wide audience - near and far",
    subheading: `Instantly convert between currencies`,
    src: sliderImageGirlBlue,
  },
  {
    heading: "Put your Business in front of a wide audience - near and far",
    subheading: `Instantly convert between currencies`,
    src: sliderImageManInYellow,
  },
  {
    heading: "Put your Business in front of a wide audience - near and far",
    subheading: `Instantly convert between currencies`,
    src: sliderImageGirlRed,
  },
];
