export type ReferalList = {
  nameInitial: string;
  name: string;
  referralStatus: string;
  accountType: string;
};

export type VoucherList = {
  icon: React.ReactNode;
  description: string;
  status: string;
  onAction?: () => void;
};
export type ReferralWins = {
  id: number;
  description: string;
}[];

export type HowItworks = {
  data: ReferralWins;
  subTitle: string;
  title: string;
};
