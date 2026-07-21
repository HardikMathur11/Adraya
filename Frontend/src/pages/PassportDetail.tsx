import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPassportByQrId } from '../lib/api/passports';
import { PassportRecord } from '../lib/api/types';
import { PassportUnfold } from '../components/passport/PassportUnfold';

export const PassportDetail: React.FC = () => {
  const { qrId = 'PASSPORT-PC-2026-8841' } = useParams<{ qrId: string }>();
  const [passport, setPassport] = useState<PassportRecord | undefined>();

  useEffect(() => {
    loadPassport();
  }, [qrId]);

  const loadPassport = async () => {
    const p = await getPassportByQrId(qrId);
    setPassport(p);
  };

  return (
    <div className="min-h-[85vh] bg-[#3F0F17] py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {passport && <PassportUnfold passport={passport} autoUnfold />}
      </div>
    </div>
  );
};
