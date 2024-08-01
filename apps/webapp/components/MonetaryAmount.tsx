type MonetaryAmountProps = {
    amount: number;
    currency: string;
}

const MonetaryAmount = ({ amount, currency }: MonetaryAmountProps) => {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
});

    return <span>{formatter.format(amount)}</span>;
}

export default MonetaryAmount;