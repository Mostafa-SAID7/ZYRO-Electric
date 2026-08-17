








export class EmailNotification  {
  getName() {
    return 'Email';
  }

  async send(recipient, subject, message) {
    // Do not log raw payloads - recipient, subject, and message may contain PII
    return new Promise(resolve => setTimeout(() => resolve(true), 500));
  }
}

export class SMSNotification  {
  getName() {
    return 'SMS';
  }

  async send(recipient, subject, message) {
    // Do not log raw payloads - recipient, subject, and message may contain PII
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
  }
}

export class PushNotification  {
  getName() {
    return 'Push';
  }

  async send(recipient, subject, message) {
    // Do not log raw payloads - recipient, subject, and message may contain PII
    return new Promise(resolve => setTimeout(() => resolve(true), 200));
  }
}

export class SlackNotification  {
  getName() {
    return 'Slack';
  }

  async send(recipient, subject, message) {
    // Do not log raw payloads - recipient, subject, and message may contain PII
    return new Promise(resolve => setTimeout(() => resolve(true), 400));
  }
}

@Injectable({ providedIn: 'root' })
export class NotificationChannelFactory {constructor() { NotificationChannelFactory.prototype.__init.call(this); }
   __init() {this.channels = new Map([
    ['email', new EmailNotification()],
    ['sms', new SMSNotification()],
    ['push', new PushNotification()],
    ['slack', new SlackNotification()]
  ])}

  getChannel(type) {
    return this.channels.get(type.toLowerCase());
  }

  registerChannel(type, channel) {
    this.channels.set(type.toLowerCase(), channel);
  }

  getAllChannels() {
    return Array.from(this.channels.values());
  }

  async sendMultiple(recipient, subject, message, channels) {
    return Promise.all(
      channels.map(async (channel) => {
        const impl = this.getChannel(channel);
        return impl ? impl.send(recipient, subject, message) : false;
      })
    );
  }
}
