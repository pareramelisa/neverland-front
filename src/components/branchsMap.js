import React from "react";
import { Map, Marker } from "pigeon-maps";
import ModalForm from "./modalForm";

export function BranchsMap({ branches, setBranches }) { //branches: todas las sucursales - setBranches: la fn que actualiza las sucursales

  const [open, setOpen] = React.useState(false); //
  const [selectedBranch, setSelectedBranch] = React.useState(null); //setea un estado para guardar la rama que esta siendo seleccionada

  const handleOpen = (branchId) => { //fn para que cuando se abra la sucursal, se setee en el estado el id de esa sucursal seleccionada
    setOpen(true);
    setSelectedBranch(branchId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBranch(null); //desetea el estado de la rama seleccionada y lo deja en null
  };
  return (
    <>
      <ModalForm //pop up que se abre cuando se selecciona una sucursal
        open={open}
        handleClose={handleClose}
        selectedBranch={selectedBranch}
        setBranches={setBranches}
        branches={branches}
      />
      <Map
        height={300}
        defaultCenter={branches[0]?.coordinates} //coordinadas por defecto 
        defaultZoom={11}
      >
        {branches.map((branch) => ( //mapea las ramas y por cada una hace un marker al que le asigna las coordenadas 
          <Marker
            width={50}
            anchor={branch.coordinates}
            key={branch.id}
            onClick={() => handleOpen(branch)} //le pasa al handle open la sucursal para que cuando se clikee la sucursal se seleccione esa en particular // por que le pasa el elemento del map y no la selected branch? o el branch.id?
          />
        ))}
      </Map>
    </>
  );
}
