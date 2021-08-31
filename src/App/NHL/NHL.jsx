import React, { useState } from "react";

import "./Nhl.less";

import { TeamsList } from "./TeamsList/TeamsList";
import { PlayersList } from "./PlayersList/PlayersList";

const Nhl = () => {
  const [selectedTeam, setSelectedTeam] = useState("");

  return (
    <div className="wrapper">
      <TeamsList
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      {selectedTeam && <PlayersList team={selectedTeam} />}
    </div>
  );
};

export default Nhl;
