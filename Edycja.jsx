import React from "react";
import {
    czyPoprawnyNumer,
    zmienZnakiNaLiczbe,
    czyNazwaIstnieje,
    czyGodzinaJestPrawidlowa,
    czyMinutaJestPrawidlowa
} from "./utilsy";
import PropTypes from "prop-types";

const EdycjaLekcji = props => {
    return (
        <div className="EdycjaLekcji">
            <div className="EdycjaLekcji__input-grupa">
                <label htmlFor="poleTekstowe">Podaj nazwę</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={props.name}
                    onChange={(e) => props.onInputChange({ [e.target.name]: e.target.value })} 
                />
            </div>
            <div className="EdycjaLekcji__input-grupa">
                <label htmlFor="czasG">Podaj czas w godzinach</label>
                <input
                    type="tel"
                    id="czasG"
                    name="czasG"
                    value={props.czasG === -1 ? "" : props.czasG}
                    onKeyPress={e => czyPoprawnyNumer(e)}
                    onChange={(e) => props.onInputChange({
                        [e.target.name]:
                            zmienZnakiNaLiczbe(e.target.value)
                    })}
                />
            </div>
            <div className="EdycjaLekcji__input-grupa">
                <label htmlFor="czasM">Podaj czas w minutach</label>
                <input 
                    type="tel"
                    id="czasM"
                    name="czasM"
                    value={props.czasM === -1 ? "" : props.czasM}
                    onKeyPress={e => czyPoprawnyNumer(e)}
                    onChange={(e) => props.onInputChange({
                        [e.target.name]:
                            zmienZnakiNaLiczbe(e.target.value)
                    })}
                />
            </div>
            <div className="buttony">
            <button disabled={!(czyNazwaIstnieje(props.name) && (czyGodzinaJestPrawidlowa(props.czasG)) && (czyMinutaJestPrawidlowa(props.czasM)))} onClick={() => props.onSave()}>OK</button>
            <button disabled={!(czyNazwaIstnieje(props.name) ||
                (czyGodzinaJestPrawidlowa(props.czasG)) ||
                (czyMinutaJestPrawidlowa(props.czasM)))}
                onClick={() => props.czyszczenieEdycji()}>Cancel</button>
            </div>
        </div>
    );
}
EdycjaLekcji.propTypes = {
    name: PropTypes.string,
    czasM: PropTypes.number,
    czasG: PropTypes.number,
    onSave: PropTypes.func,
    czyPoprawnyNumer: PropTypes.func,
    czyszczenieEdycji: PropTypes.func
};

export default EdycjaLekcji;