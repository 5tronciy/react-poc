import React, { useState } from "react";

import s from "./Nhl.less";

import { TeamsList } from "./TeamsList/TeamsList";
import { PlayersList } from "./PlayersList/PlayersList";

const Nhl = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    return (
        <div className={s.wrapper}>
            <div>
                <TeamsList
                    selected={selectedTeam}
                    setSelected={setSelectedTeam}
                />
            </div>
            <div>{selectedTeam && <PlayersList team={selectedTeam} />}</div>
        </div>
    );
};

export default Nhl;
