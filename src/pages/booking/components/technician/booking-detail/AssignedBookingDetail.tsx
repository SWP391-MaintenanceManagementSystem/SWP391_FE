import React from "react";
import { useParams } from "react-router-dom";

export default function AssignedBookingDetail() {
  const { id } = useParams<{ id: string }>();
  return <div>AssignedBookingDetail {id}</div>;
}
