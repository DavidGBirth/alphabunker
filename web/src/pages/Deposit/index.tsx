/**
 * Archive: src/pages/Deposit.tsx
 *
 * Description: Deposit page
 *
 * Date: 2022/08/02
 *
 * Author: Samuel
 */

import { UploadSimple } from 'phosphor-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { api } from '../../libs/api';
import { useUser } from '../../providers/UserProvider';

interface ApiDeposit {
  data: ApiResponse;
  message: string[];
}

interface ApiResponse {
  accountNumber: number;
  accountVerificationCode: number;
  agencyNumber: number;
  agencyVerificationCode: number;
  balance: number;
  fee: number;
}

export const Deposit = () => {
  const { account, setAccount } = useUser();
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  async function handleDeposit() {
    try {
      const { data } = await api.post<ApiDeposit>('deposit', {
        agencyNumber: account?.agencyNumber,
        agencyVerificationCode: account?.agencyVerificationCode,
        accountNumber: account?.accountNumber,
        accountVerificationCode: account?.accountVerificationCode,
        value,
        password,
      });
      console.log(data);
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
        `/transaction/Deposito/${new Date()}/${value}/${data.data.balance}`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex flex-col items-center h-screen w-screen">
      {modal && (
        <Modal
          title="Depósito"
          setModal={setModal}
          handleConfirmModal={handleDeposit}
        />
      )}
      <Header balance={account ? account.balance : 0} />
      <div className="w-72 h-[400] flex flex-col px-3 py-3 rounded dark:border-2 mt-3 border-btn-secondary-base shadow-md">
        <div className="flex flex-row text-header-gold text-base">
          <div className="flex items-center">
            <UploadSimple size={20} className="mr-2" />
          </div>
          <div className="font-medium">Depósito</div>
        </div>

        <div className="mt-4">
          <div className="text-paragraph-dark dark:text-header-light">
            Dados para depósito
          </div>
          <div className="flex flex-row mt-2">
            <div className="flex flex-col mr-7">
              <input
                className="h-8 w-28 rounded bg-input-readonly text-input-placeholder pl-2"
                type="text"
                value={account?.agencyNumber}
                disabled
              />
              <span className="text-xs text-input-inactive">Agência</span>
            </div>
            <div className="flex flex-col">
              <input
                className="h-8 w-28 rounded bg-input-readonly text-input-placeholder pl-2"
                type="text"
                value={account?.agencyVerificationCode}
                disabled
              />
              <span className="text-xs text-input-inactive">Dígito</span>
            </div>
          </div>

          <div className="flex flex-row mt-2">
            <div className="flex flex-col mr-7">
              <input
                className="h-8 w-28 rounded bg-input-readonly text-input-placeholder pl-2"
                type="text"
                value={account?.accountNumber}
                disabled
              />
              <span className="text-xs text-input-inactive">Conta</span>
            </div>
            <div className="flex flex-col">
              <input
                className="h-8 w-28 rounded bg-input-readonly text-input-placeholder pl-2"
                type="text"
                value={account?.accountVerificationCode}
                disabled
              />
              <span className="text-xs text-input-inactive">Dígito</span>
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
          label="Depositar"
          type="button"
          onClick={() => setModal(true)}
        />
      </div>
    </section>
  );
};
