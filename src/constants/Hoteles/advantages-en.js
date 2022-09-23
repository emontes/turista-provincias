import React from 'react'
import { FaSearchDollar, FaPiggyBank } from 'react-icons/fa'
import { RiSecurePaymentLine } from 'react-icons/ri'

const advantages = [
  {
    icon: <FaSearchDollar />,
    title: 'Prices and Discounts',
    text:
      'We monitor offers, search and compare prices provided by 70 hotel reservation services.',
  },
  {
    icon: <FaPiggyBank />,
    title: 'No hidden fees',
    text:
      'Turista operates with and shows the final price of the room. No additional taxes or hidden fees.',
  },

  {
    icon: <RiSecurePaymentLine />,
    title: 'Safe',
    text:
      'All reservation services are thoroughly inspected by our Security Department.',
  },
]

export default advantages
