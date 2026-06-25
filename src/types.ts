/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CardState {
  holderName: string;
  cardNumber: string;
  balance: number;
  status: 'Active' | 'Frozen';
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'purchase' | 'cashback';
  amount: number;
  description: string;
  date: string;
}

export interface DesignConfig {
  brandName: string;
  slogan: string;
  iconName: string;
  colorTheme: 'gold' | 'royal' | 'emerald' | 'crimson' | 'dark';
  layout: 'centered' | 'clean' | 'shield';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
}
