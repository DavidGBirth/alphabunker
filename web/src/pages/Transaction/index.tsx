import { useState } from 'react';
import { Receipt } from 'phosphor-react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Transaction page
 *
 * Date: 2022/08/02
 *
 * Author: Samuel
 */

export const Transaction = () => {
  const { type, date, value, balance, targetUser, agency, newAccount } =
    useParams<Record<string, string | undefined>>();
  // const [type, setType] = useState('');
  console.log({ type, date, value });
  const dateFormated = new Date();

  return (
    <section className="flex flex-col items-center h-screen w-screen">
      <Header balance={Number(balance)} />
      <div className="w-72 h-[400] flex flex-col p-3 rounded dark:border-2 mt-3 border-btn-secondary-base bg-icon-light dark:bg-body-dark">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row text-header-gold text-base">
            <div className="flex items-center">
              <Receipt size={20} className="mr-2" />
            </div>
            <div className="font-medium">Comprovante de transação</div>
          </div>
        </div>

        <div className="mt-7 text-paragraph-light-200 p-1 text-sm font-medium bg-body-light-100 dark:bg-body-dark">
          <div>
            <p className="text-paragraph-light-100">Tipo: {type}</p>
            <div className="py-2">
              <p>
                Data:
                {dateFormated.toLocaleString('default', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
          <div>
            {type === 'Transferencia' ? (
              <div>
                <p className="text-paragraph-light-100">Dados de destino:</p>
                <div className="px-1">
                  <div className="flex flex-col">
                    <p>Nome: {targetUser}</p>
                    <p>Agência: {agency}</p>
                    <p>Conta: {newAccount}</p>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="flex flex-row justify-between pt-2">
              <p className="text-base text-paragraph-light-100">Valor</p>
              <p className="text-input-error text-center">R$ {value}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
