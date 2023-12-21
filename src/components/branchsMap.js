import React from "react";
import { Map, Marker } from "pigeon-maps";
import ModalForm from "./modalForm";

export function BranchsMap({ branches, setBranches }) {
  const [open, setOpen] = React.useState(false);
  const [selectedBranch, setSelectedBranch] = React.useState(null);

  const handleOpen = (branchId) => {
    setOpen(true);
    setSelectedBranch(branchId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBranch(null);
  };
  return (
    <>
      <ModalForm
        open={open}
        handleClose={handleClose}
        selectedBranch={selectedBranch}
        setBranches={setBranches}
        branches={branches}
      />
      <Map
        height={300}
        defaultCenter={branches[0]?.coordinates}
        defaultZoom={11}
      >
        {branches.map((branch) => (
          <Marker
            width={50}
            anchor={branch.coordinates}
            key={branch.id}
            onClick={() => handleOpen(branch)}
          />
        ))}
      </Map>
    </>
  );
}
