import React from "react";
import PropTypes from "prop-types";
//import "./Odliczanie.css";
import { godzinaMinutaDoSekund, sekundyDoGodzinMinutSekund } from "./utilsy";

const Odliczanie = (props) => {
  const sekundyLekcja = godzinaMinutaDoSekund(props.czasG, props.czasM);
  const sekundyTeraz =
    godzinaMinutaDoSekund(props.obecnyCzas.godzina, props.obecnyCzas.minuta) +
    props.obecnyCzas.sekunda;

  const pozostaloSekund = sekundyLekcja - sekundyTeraz;
  const pozostaloSekundTekst =
    pozostaloSekund > 0
      ? sekundyDoGodzinMinutSekund(pozostaloSekund)
      : "ta lekcja odbędzie się dopiero jutro";

  return (
    <div className="odliczanie">
      <div>
        <strong>{props.name}</strong> - {props.czasG}:{props.czasM}
      </div>
      <div>
        <i>do tej lekcji pozstało jeszcze: </i> {pozostaloSekundTekst}
      </div>
      <div className="operacje">
        <i className="edycja" onClick={() => props.edytujLekcje(props.id)}>
          [E]
        </i>
        <b className="iks" onClick={() => props.Usun(props.id)}>
          {" "}
          x
        </b>
      </div>
    </div>
  );
};

Odliczanie.propTypes = {
  name: PropTypes.string,
  czasM: PropTypes.number,
  czasG: PropTypes.number,
  edytujLekcje: PropTypes.func,
  obecnyCzas: PropTypes.shape({
    godzina: PropTypes.number,
    minuta: PropTypes.number,
    sekunda: PropTypes.number,
  }),
  Usun: PropTypes.func,
};

export default Odliczanie;
