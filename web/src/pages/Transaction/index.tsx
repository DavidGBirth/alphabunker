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
  const { transactionId } = useParams<Record<string, string | undefined>>();
  const [type, setType] = useState('');
  console.log(transactionId);

  return (
    <section className="flex flex-col items-center h-screen w-screen">
      <Header />
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
            <p className="text-paragraph-light-100">
              Tipo: Transferência - Enviada
            </p>
            <div className="py-2">
              <p>Data: 03/07/2022 20:45</p>
            </div>
          </div>
          <div>
            {type === 'tranfer' ? (
              <>
                <p className="text-paragraph-light-100">Dados de destino:</p>
                <div className="px-1">
                  <div className="flex flex-col">
                    <p>Nome: Dhalsim Fonseca</p>
                    <p>Agência: 1027-7</p>
                    <p>Conta: 93459-2</p>
                  </div>
                </div>
              </>
            ) : null}
            <div className="flex flex-row justify-between pt-2">
              <p className="text-base text-paragraph-light-100">Valor</p>
              <p className="text-input-error text-center">- R$26,49</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
