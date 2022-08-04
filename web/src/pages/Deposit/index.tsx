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
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { api } from '../../libs/api';

export const Deposit = () => {
  const [modal, setModal] = useState(false);

  async function handleDeposit() {
    try {
      const result = await api.post('deposit', {
        agency: '',
        account: '',
        value: '',
      });
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
      <Header />
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
          <input
            className="w-full h-8 rounded text-input-text bg-input-base pl-2"
            type="text"
            placeholder="Valor"
          />
        </div>

        <div className="my-4">
          <input
            className="w-full h-8 rounded text-input-text bg-input-base pl-2"
            type="text"
            placeholder="Senha"
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
