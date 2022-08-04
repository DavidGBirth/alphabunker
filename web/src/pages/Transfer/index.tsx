/**
 * Archive: src/pages/Transfer.tsx
 *
 * Description: Transfer page
 *
 * Date: 2022/08/02
 *
 * Author: Samuel
 */

import { Header } from '../../components/Header';
import { ArrowsLeftRight } from 'phosphor-react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { api } from '../../libs/api';
import { useState } from 'react';
import { useUser } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';

export const Transfer = () => {
  const { account, setAccount } = useUser();
  const [sendAgencyNumber, setSendAgencyNumber] = useState<string>();
  const [sendAccountNumber, setSendAccountNumber] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [value, setValue] = useState<string>();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  async function handleTransfer() {
    const agency = sendAgencyNumber?.split('-');
    const newAccount = sendAccountNumber?.split('-');
    console.log(value, password, agency, account);
    try {
      if (agency && newAccount) {
        const { data } = await api.post('/transfer', {
          newAgencyNumber: Number(agency[0]),
          newAgencyVerificationCode: Number(agency[1]),
          newAccountNumber: Number(newAccount[0]),
          newAccountVerificationCode: Number(newAccount[1]),
          password,
          value,
          ...account
        });
        if (setAccount) {
          setAccount({
            accountNumber: data.data.accountNumber,
            accountVerificationCode: data.data.accountVerificationCode,
            agencyNumber: data.data.agencyNumber,
            agencyVerificationCode: data.data.agencyVerificationCode,
            balance: data.data.balance,
          });
        }
        navigate(
          `/transaction/Transferencia/${new Date()}/${value}/${data.data.balance}/${data.data.nameTargetUser}/${sendAgencyNumber}/${sendAccountNumber}`,
        );
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col items-center h-screen w-screen">
      {modal && (
        <Modal
          title="Transferência"
          setModal={setModal}
          handleConfirmModal={handleTransfer}
        />
      )}
      <Header balance={account ? account.balance : 0} />
      <div className="w-72 h-[400] flex flex-col px-3 py-3 rounded dark:border-2 mt-3 border-btn-secondary-base shadow-md">
        <div className="flex flex-row text-header-gold text-base">
          <div className="flex items-center">
            <ArrowsLeftRight size={20} className="mr-2" />
          </div>
          <div className="font-medium">Transferência</div>
        </div>

        <div className="mt-4">
          <div className="text-paragraph-dark dark:text-header-light">
            Origem
          </div>
          <div className="flex flex-row mt-2">
            <div className="flex flex-col mr-7">
              <input
                className="h-8 w-28 rounded bg-input-readonly text-input-placeholder pl-2"
                type="text"
                value="1510-5"
                disabled
              />
              <span className="text-xs text-input-inactive">Agência</span>
            </div>
            <div className="flex flex-col">
              <input
                className="h-8 w-28 rounded bg-input-readonly text-input-placeholder pl-2"
                type="text"
                value="95785-3"
                disabled
              />
              <span className="text-xs text-input-inactive">Conta</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-paragraph-dark dark:text-header-light">
            Destino
          </div>
          <div className="flex flex-row mt-2">
            <div className="flex flex-col mr-7">
              <input
                className="h-8 w-20 rounded text-input-text bg-input-base pl-2"
                type="text"
                onBlur={(e) => setSendAgencyNumber(e.target.value)}

              />
              <span className="text-xs text-input-inactive">Agência</span>
            </div>
            <div className="flex flex-col">
              <input
                className="h-8 w-24 rounded text-input-text bg-input-base pl-2"
                type="text"
                onBlur={(e) => setSendAccountNumber(e.target.value)}
              />
              <span className="text-xs text-input-inactive">Conta</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <input
            className="w-full h-8 rounded text-input-text bg-input-base pl-2"
            type="text"
            placeholder="Valor"
            onBlur={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="my-4">
          <input
            className="w-full h-8 rounded text-input-text bg-input-base pl-2"
            type="password"
            placeholder="Senha"
            onBlur={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          category="primary"
          label="Transferir"
          type="button"
          onClick={() => setModal(true)}
        />
      </div>
    </section>
  );
};
