/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/08/02
 *
 * Author: Samuel
 */

import { Bank, Bell } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { api } from '../../libs/api';
import { useUser } from '../../providers/UserProvider';

// import { useUser } from '../../providers/UserProvider';

// export const Extract = () => {
//   const { user, account } = useUser();
//   console.log(account);

//   return <h1 className="text-white">Extrato</h1>;
// };

interface Transaction {
  date: string;
  type: string;
  value: number;
  fee: number;
}

interface ResponseAPI {
  data: Transaction[];
  message: string[];
}

export const Extract = () => {
  const { user, account } = useUser();
  const [deposit, setDeposit] = useState<number>();
  const [transfer, setTransfer] = useState<number>();
  const [withdraw, setWithdraw] = useState<number>();

  async function getExtract() {
    try {
      const { data } = await api.post<ResponseAPI>('/extract', {
        password: user?.password,
        agencyNumber: account?.agencyNumber,
        agencyVerificationCode: account?.agencyVerificationCode,
        accountNumber: account?.accountNumber,
        accountVerificationCode: account?.accountVerificationCode,
      });
      data.data.forEach((item) => {
        if (item.type === 'deposit') {
          if (deposit) {
            const newDeposit = deposit + item.value;
            setDeposit(newDeposit);
          } else {
            const newDeposit = item.value;
            setDeposit(newDeposit);
          }
        }
        if (item.type === 'withdraw') {
          if (withdraw) {
            const newWithdraw = withdraw + item.value;
            setWithdraw(newWithdraw);
          } else {
            const newWithdraw = item.value;
            setWithdraw(newWithdraw);
          }
        }
        if (item.type === 'transfer') {
          if (transfer) {
            const newTransfer = transfer + item.value;
            setTransfer(newTransfer);
          } else {
            const newTransfer = item.value;
            setTransfer(newTransfer);
          }
        }
      });
      console.log(deposit, transfer, withdraw);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  function moneyTransform(number: number | undefined) {
    const string = number?.toFixed(2).toString().replace('.', ',');
    return string;
  }

  useEffect(() => {
    getExtract();
  }, []);

  return (
    <section className="flex flex-col items-center h-screen w-screen">
      <Header balance={account ? account.balance : 0} />
      <div className="w-72 h-[400] flex flex-col px-3 py-3 rounded dark:border-2 mt-3 border-btn-secondary-base bg-icon-light dark:bg-body-dark">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row text-header-gold text-base">
            <div className="flex items-center">
              <Bank size={20} className="mr-2" />
            </div>
            <div className="font-medium">Extrato de transações</div>
          </div>
          <div className="flex items-center">
            <Bell
              size={16}
              className="text-icon-dark-200 dark:text-icon-dark-100"
            />
          </div>
        </div>

        <div className="mt-10 text-paragraph-light-100 p-1 text-sm font-bold bg-body-light-100 dark:bg-body-dark">
          <div>
            <p className="text-paragraph-light-200">03/07/2022</p>
            <div className="px-1">
              <div className="flex flex-row justify-between">
                <p>Transferência enviada</p>
                <p className="text-input-error font-bold">
                  - R${transfer ? moneyTransform(transfer) : '0,00'}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Saque</p>
                <p className="text-input-error font-bold">
                  - R${withdraw ? moneyTransform(withdraw) : '0,00'}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Depósito</p>
                <p className="text-input-positive font-bold">
                  + R${deposit ? moneyTransform(deposit) : '0,00'}
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <p>Transferência recebida</p>
                <p className="text-input-positive font-bold">+ R$0,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
