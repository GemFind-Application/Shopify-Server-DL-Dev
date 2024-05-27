<?php

// app/Mail/SendEmail.php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    public $senderEmail;
    public $senderName;

    /**
     * Create a new message instance.
     *
     * @param  array  $data
     * @param  string  $senderEmail
     * @param  string  $senderName
     * @return void
     */
    public function __construct($data, $senderEmail, $senderName)
    {
        $this->data = $data;
        $this->senderEmail = $senderEmail;
        $this->senderName = $senderName;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->senderEmail, $this->senderName)
            ->replyTo($this->senderEmail, $this->senderName)
            ->subject('Pending Questions From ' . $this->data['accountName'])
            ->view('store_emails.simple_message') // Replace with the actual name of your email template if it's different
            ->with([
                'userEmail' => $this->senderEmail,
            ]);
        $message->sender($email);
    }
}
