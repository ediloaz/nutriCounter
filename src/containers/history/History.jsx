import { useEffect, useState } from "react";
import moment from "moment";
import { orderBy, isEmpty } from "lodash";

import { Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";

import BackButton from "../../components/BackButton/BackButton";

import { getCategoryNameById } from "../../helpers/categories";
import { FOOD_TIMES } from "../../constants/foodTimes";

import "./history.css";

const FLAT_COLORS = [
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f39c12",
  "#d35400",
  "#7f8c8d",
];

const _parseTimeToMoment = (timeString) => moment(timeString, "h:mm a");

const HistoryTimelineItem = ({
  flatColor,
  nextFlatColor,
  odd,
  hour,
  foodTime,
  categories,
  isFinal,
}) => {
  const topLineColor = flatColor;
  const bottomLineColor = nextFlatColor;

  return (
    <TimelineItem className="itemContainer">
      <TimelineOppositeContent sx={{ py: "12px", px: 2, alignSelf: "center" }}>
        <Typography variant="h6" component="span">
          {foodTime ? `${FOOD_TIMES?.[foodTime]?.name ?? "Desconocido"}` : ""}
        </Typography>
        <Typography className="hour">{hour}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector sx={{ bgcolor: topLineColor }} />
        <TimelineDot sx={{ bgcolor: topLineColor }}>
          {FOOD_TIMES?.[foodTime]?.icon()}
        </TimelineDot>
        <TimelineConnector
          sx={{ bgcolor: isFinal ? "transparent" : bottomLineColor }}
        />
      </TimelineSeparator>
      <TimelineContent
        sx={{ m: "auto 0" }}
        variant="body2"
        color="text.secondary"
      >
        <div className={`categories ${odd ? "odd" : ""}`}>
          {Object.keys(categories).map(
            (category) =>
              Boolean(categories?.[category]) && (
                <span className="category">
                  {getCategoryNameById(category)}: {categories?.[category]}
                </span>
              )
          )}
        </div>
      </TimelineContent>
    </TimelineItem>
  );
};

const History = ({ plann, daily, getDaily, getPlanns, changeScreen }) => {
  const [dailyHistory, setDailyHistory] = useState();

  var nextFlatColor;

  useEffect(() => {
    if (!dailyHistory) {
      const dailyQuery = getDaily(daily);
      dailyQuery.then((data) => {
        console.log(`Daily actual de ${daily}:`, data);
        const history = data?.history || [];
        if (JSON.stringify(history) !== JSON.stringify(dailyHistory)) {
          // Re order by time
          const sortedHistory = orderBy(history, (obj) =>
            _parseTimeToMoment(obj.hour)
          );

          setDailyHistory(sortedHistory);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyHistory, plann, daily, getPlanns, getDaily]);

  const isEmptyHistory = isEmpty(dailyHistory);

  return (
    <div className="History">
      <BackButton changeScreen={changeScreen} screen="main" />
      <span className="title">Historial</span>
      <Typography className="prettyPhrase" component="span" variant="body1">
        {isEmptyHistory ? (
          <>Nada por acá, agrega comida antes de venir aquí.</>
        ) : (
          <>Recuerda que sin importar que, <b>siempre sos suficiente</b> ❤️</>
        )}
      </Typography>
      <Timeline position="alternate" className="list">
        {!isEmptyHistory && (
          dailyHistory?.map((item, i) => {
            const flatColor =
              nextFlatColor ||
              FLAT_COLORS[Math.floor(Math.random() * FLAT_COLORS.length)];
            nextFlatColor =
              FLAT_COLORS[Math.floor(Math.random() * FLAT_COLORS.length)];

            return (
              <HistoryTimelineItem
                key={item?.hour}
                hour={item?.hour}
                foodTime={item?.foodTime}
                odd={i % 2}
                categories={{
                  protein: item?.protein,
                  carb: item?.carb,
                  dairy: item?.dairy,
                  fat: item?.fat,
                  fruit: item?.fruit,
                  vegetable: item?.vegetable,
                }}
                flatColor={flatColor}
                nextFlatColor={nextFlatColor}
                isFinal={i === dailyHistory?.length - 1}
              />
            );
          })
        )}
      </Timeline>
    </div>
  );
};

export default History;
