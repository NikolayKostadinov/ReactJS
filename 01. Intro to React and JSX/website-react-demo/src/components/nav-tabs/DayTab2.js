import ScheduleItem from "./ScheduleItem";

export default function DayTab2() {
  return (
    <div role="tabpanel" className="tab-pane fade" id="day-2">
      <div className="row">
        <ScheduleItem
          img="img/speaker-4.png"
          timeslot="10am to 10:30am"
          theme="MAKING DOG FOOD PART OF A BALANCED DIET"
          description="Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things." />

        <ScheduleItem
          img="img/speaker-3.png"
          timeslot="10:45am to 11:30am"
          theme="HANDS-ON WEB AUDIO"
          description="Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things." />

        <ScheduleItem
          img="img/speaker-2.png"
          timeslot="12:00pm to 01:30pm"
          theme="CONVERSION RATE OPTIMIZATION TECHNIQUES IN ECOMMERCE"
          description="Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things." />

        <ScheduleItem
          img="img/speaker-1.png"
          timeslot="02:00pm to 03.30pm"
          theme="PAPER PROTOTYPING APPLICATIONS"
          description="Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things." />

      </div>
    </div>
  );
}