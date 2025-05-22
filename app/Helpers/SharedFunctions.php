<?php

function cleanPhoneNumber(string|null $phone): string
{
    return $phone ? preg_replace('/\D/', '', $phone) : '';
}

function formatDate(string $date): string
{
    $dateUTC = new DateTime($date, new DateTimeZone('UTC'));
    return $dateUTC->format('Y-m-d');
}
