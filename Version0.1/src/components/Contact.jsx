
import { Input, Button, Tooltip } from 'antd';
import { MailOutlined, UserOutlined, CopyOutlined, GithubOutlined, ContactsOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import '../styles/contactform.css'; 

const Contact = () => {
  const handleCopy = (text) => {
    copy(text);
    console.log(`${text} copied to clipboard!`);
  };

  return (
    <div className="contact-container">
      <h2><ContactsOutlined style={{ marginRight: '10px' }} />Contact Information</h2>
      <div className="contact-info">
        <div className="contact-field">
          <Input prefix={<UserOutlined />} readOnly value="st-louder" />
          <Tooltip title="Copy Name">
            <Button icon={<CopyOutlined />} onClick={() => handleCopy('st-louder')} />
          </Tooltip>
        </div>
        <div className="contact-field">
          <Input prefix={<MailOutlined />} readOnly value="lyvanmy357@gmail.com" />
          <Tooltip title="Copy Email">
            <Button icon={<CopyOutlined />} onClick={() => handleCopy('lyvanmy357@gmail.com')} />
          </Tooltip>
        </div>
        <div className="contact-field">
          <Input prefix={<GithubOutlined />} readOnly value="https://github.com/St-Louder" />
          <Tooltip title="Copy GitHub Profile">
            <Button icon={<CopyOutlined />} onClick={() => handleCopy('https://github.com/St-Louder')} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Contact;
