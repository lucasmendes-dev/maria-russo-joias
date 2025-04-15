<?php

function cleanPhoneNumber(string $phone): string
{
    return preg_replace('/\D/', '', $phone);
}
