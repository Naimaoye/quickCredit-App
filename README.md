# Quick Credit

# Description
Quick credit is an online lending platform, aimed to reduce the rate at which people run out of cash. It's fast, reliable and comes with a very little loan interest. Deployed on the following url: <br>
https://naimaoye.github.io/adc-quickcredit/UI/index.html <br>
https://naimaoye.github.io/adc-quickcredit/UI/dashboard.html <br>
https://naimaoye.github.io/adc-quickcredit/UI/admin-dashboard.html
# Table of Contents
<ul>
            <li>
                <a href="#Technologies">Technologies</a>
            </li>
            <li>
                <a href="#Features">Features</a>
            </li>
          <li>
                <a href="#Installations">Installation</a>
            </li>
        </ul>
        [Test](#test)
 
# Technologies
<ul>
<li>Nodejs (Express framework)</li>
  </ul>

# Features
<ul>
<li>Users Login</li>
<li>Users signup</li>
<li>users dashboard</li>
<li>admin dashboard</li>
</ul>

# Getting Started
# Installation
<ul>
<li>git clone https://github.com/Naimaoye/andela-quickcredit.git</ul>
<li>git checkout -b develop</li>
<li>run npm install</li>
<li>Set environment variables
<ul>
<li>PORT</li>
<li>SECRET_KEY</li>
<li>USER</li>
<li>PASSWORD</li>
</ul>
</li>
<li>run npm start</li>
</ul>

# Test with Postman
<ul>
<li>install POSTMAN app</li>
<li>navigate to localhost:PORT/endpoints on POSTMAN</li>
<li>
</ul>

# API Endpoint Route
Currently,
<table>
  <tr>
    <td>HTTP VERB</td>
    <td>ENDPOINT</td>
    <td>TASK</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/signin</td>
    <td>User Login</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/auth/signup</td>
    <td>create a new user</td>
  </tr>
   <tr>
    <td>GET</td>
    <td>/api/v1/users</td>
    <td>Get All users</td>
  </tr>
  </table>
  
# Author
OYEWALE Naimat
