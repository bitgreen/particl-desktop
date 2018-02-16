import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { SendService } from '../send.service';

import { Amount } from '../../../shared/util/utils';
import { TransactionBuilder } from '../transaction-builder.model';

@Component({
  selector: 'app-send-confirmation-modal',
  templateUrl: './send-confirmation-modal.component.html',
  styleUrls: ['./send-confirmation-modal.component.scss']
})
export class SendConfirmationModalComponent implements OnInit {

  @Output() onConfirm: EventEmitter<string> = new EventEmitter<string>();

  public dialogContent: string;
  public send: TransactionBuilder;

  // send-confirmation-modal variables
  transactionType: string = '';
  sendAmount: Amount = new Amount(0);
  sendAddress: string = '';
  receiverName: string = '';
  transactionFee: number = 0;
  totalAmount: number = 0;

  constructor(private dialogRef: MatDialogRef<SendConfirmationModalComponent>,
              private sendService: SendService) {
  }

  ngOnInit() {
    this.setDetails();
  }

  confirm(): void {
    this.onConfirm.emit();
    this.dialogClose();
  }

  dialogClose(): void {
    this.dialogRef.close();
  }

  /**
    * Set the confirmation modal data
    */
  setDetails(): void {
    this.getTransactionFee();

    this.sendAddress = this.send.toAddress;
    this.transactionType = this.send.input;
    this.sendAmount = new Amount(this.send.amount);
    this.receiverName = this.send.toLabel;
    console.log(this.transactionType);
  }

  getTransactionFee() {
    this.sendService.getTransactionFee(this.send).subscribe(fee => {
      this.transactionFee = fee.fee
    });
  }

}
