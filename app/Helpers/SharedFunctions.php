<?php

function cleanPhoneNumber(string|null $phone): string
{
    return $phone ? preg_replace('/\D/', '', $phone) : '';
}
