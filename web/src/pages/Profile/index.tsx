import { ArrowLeft, IdentificationCard, Vault } from 'phosphor-react';
import { useUser } from '../../providers/UserProvider';
import avatar from '../../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';

/**
 * Archive: src/pages/Profile.tsx
 *
 * Description: Profile page
 *
 * Date: 2022/08/02
 *
 * Author: Samuel
 */

export const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <header className="w-screen h-screen flex flex-col items-center justify-start">
      <section className="w-full bg-brand-base rounded-b-2xl p-6 pb-11">
        <div>
          <ArrowLeft
            size={20}
            className="text-icon-light"
            onClick={() => navigate(-1)}
          />
          <div className="flex flex-col items-center">
            <img src={avatar} alt="Profile picture" />
            <h1 className="text-header-light font-medium text-xl mt-3">
              {user?.name}
            </h1>
          </div>
        </div>
      </section>
      <div className="w-72 h-[400] flex flex-col p-3 rounded dark:border-2 mt-3 border-btn-secondary-base bg-icon-light dark:bg-body-dark">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row text-header-gold text-base">
            <div className="flex items-center">
              <IdentificationCard size={20} className="mr-2" />
            </div>
            <div className="font-medium">Meus dados</div>
          </div>
        </div>

        <div className="mt-6 text-paragraph-light-200 p-1 text-sm font-medium bg-body-light-100 dark:bg-body-dark">
          <div className="py-1">
            <p>Nome: Dhesem Pregads da Silva</p>
            <p>Data de nascimento: 01/01/2000</p>
            <p>CPF: 123.456.789-01</p>
          </div>
        </div>
      </div>

      <div className="w-72 h-[400] flex flex-col p-3 rounded dark:border-2 mt-3 border-btn-secondary-base bg-icon-light dark:bg-body-dark">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row text-header-gold text-base">
            <div className="flex items-center">
              <Vault size={20} className="mr-2" />
            </div>
            <div className="font-medium">Minhas contas correntes</div>
          </div>
        </div>

        <div className="mt-6 text-paragraph-light-200 p-1 text-sm font-medium bg-body-light-100 dark:bg-body-dark">
          <div className="px-1">
            <div className="flex flex-col">
              <p>Agência: 1027-7</p>
              <p>Conta: 93459-2</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-paragraph-light-200 p-1 text-sm font-medium bg-body-light-100 dark:bg-body-dark">
          <div className="px-1">
            <div className="flex flex-col">
              <p>Agência: 1027-7</p>
              <p>Conta: 93459-2</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
