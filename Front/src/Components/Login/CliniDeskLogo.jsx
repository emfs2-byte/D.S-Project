import React from 'react';
import { MonitorCheck, Stethoscope } from "lucide-react";

export default function CliniDeskLogo({ isFormHeader = false }) {
  return (
    <div className={`flex flex-col items-center ${isFormHeader ? 'mb-6' : 'mb-12'}`}>
    
      {/* Container Principal*/}
      <div className="flex flex-row items-center gap-4">
        
        {/*BOX DO ÍCONE */}
        <div className={`relative flex items-center justify-center rounded-[18px] shadow-md shrink-0 ${
          isFormHeader 
            ? 'bg-[#0091ff] size-16' 
            : 'bg-white/10 size-16 border border-white/10' 
        }`}>
       
          <MonitorCheck className="text-white size-9" strokeWidth={2.5} />

          {/*ESTETOSCÓPIO*/}
          <div className={`absolute bottom-[-2px] right-[-2px] rounded-full p-1 border-2 ${
            isFormHeader 
              ? 'bg-white border-white' 
              : 'bg-[#1565c0] border-[#1565c0]' 
          }`}>
            <Stethoscope 
              className={`${isFormHeader ? 'text-[#001a3d]' : 'text-white'} size-4`} 
              strokeWidth={3} 
            />
          </div>
        </div>

        {/*NOME CLINIDESK*/}
        <h1 className={`text-4xl font-extrabold tracking-tighter leading-none ${
          isFormHeader ? 'text-[#001a3d]' : 'text-white'
        }`}>
          Clini<span className={isFormHeader ? 'text-[#0091ff]' : 'text-white'}>Desk</span>
        </h1>
      </div>

      {/*SLOGAN*/}
      {!isFormHeader && (
        <p className="text-[19px] font-medium leading-tight mt-4 text-center text-white/80">
          Sua recepção, no controle
        </p>
      )}
    </div>
  );
}