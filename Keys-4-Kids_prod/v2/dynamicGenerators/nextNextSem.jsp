<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
<%= com.adeda.adedapi.servlet.ProxyServlet.invokeMethod(new HttpServletRequestWrapper(request), new HttpServletResponseWrapper(response), "com.keysforkids.KeyMan.Schedule.JspKeysSchedule", null, null, "getScheduleData", new String[]{"int", "java.lang.String"}, new Object[]{2, request.getParameter("InstructionKeyword")}) %>
</body>
</html>