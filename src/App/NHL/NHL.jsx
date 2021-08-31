import React, { useState } from "react";

import "./NHL.less";

import { Teams } from "./Teams/Teams";
import { PlayersList } from "./PlayersList/PlayersList";

const NHL = () => {
  const [selectedTeam, setSelectedTeam] = useState("");

  return (
    <div className="wrapper">
      <Teams selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
      {selectedTeam && <PlayersList team={selectedTeam} />}
    </div>
  );
};

export default NHL;
