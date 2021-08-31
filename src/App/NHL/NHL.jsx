import React, { useState } from "react";

import s from "./Nhl.less";

import { TeamsList } from "./TeamsList/TeamsList";
import { PlayersList } from "./PlayersList/PlayersList";

const Nhl = () => {
  const [selectedTeam, setSelectedTeam] = useState("");

  return (
    <div className={s.wrapper}>
      <TeamsList
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      {selectedTeam && <PlayersList team={selectedTeam} />}
    </div>
  );
};

export default Nhl;
