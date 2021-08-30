import React, { useState } from "react";

import "./NHL.less";

import { Teams } from "./Teams/Teams";
import { Players } from "./Players/Players";

const NHL = () => {
  const [selectedTeam, setSelectedTeam] = useState("");

  return (
    <div className="wrapper">
      <Teams selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
      {selectedTeam && <Players team={selectedTeam} />}
    </div>
  );
};

export default NHL;
