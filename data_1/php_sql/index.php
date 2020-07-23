<html>
  <head>
    <title>Case Summary Chart</title>
  </head>
  <body>
  <?php
  // Store server and DB info for new connection
  // NOTE: Replace with your own values
  $server = "localhost";
  $user = "user";
  $password = "password";
  $db = "clean_data";
  // Create connection
  $connection = new mysqli($server, $user, $password, $db);
  // Check connection
  if ($connection->connect_error) {
    echo "<p><strong>Error</strong>: Cannot connect to database.</p>";
  } else {
    // Create SQL query
    $sql = "SELECT
    case_category AS `Case Categories`,
    COUNT(*) AS `Count`,
    min(case_date) AS `Earliest Case`,
    max(case_date) AS `Latest Case`
    FROM
    clean_data
    GROUP BY
    Case_category";
    // Store result
    $result = $connection->query($sql);
    // Check for result
    if ($result->num_rows > 0) {
      echo "<table>"; 
      echo "<tr style='background: #e3e3e3;font-weight:bold;'>";
      echo "<td style='padding: 0.3rem 0.5rem;'>Case Category</td>";
      echo "<td style='padding: 0.3rem 0.5rem;'>Count</td>";
      echo "<td style='padding: 0.3rem 0.5rem;'>Earliest Case</td>";
      echo "<td style='padding: 0.3rem 0.5rem;'>Latest Case</td>";
      echo "</tr>";
      while($rowitem = mysqli_fetch_array($result)) {
        echo "<tr>";
        echo "<td style='padding: 0.3rem 0.5rem;'>" . $rowitem['Case Categories'] . "</td>";
        echo "<td style='padding: 0.3rem 0.5rem;text-align: center;'>" . $rowitem['Count'] . "</td>";
        echo "<td style='padding: 0.3rem 0.5rem;'>" . $rowitem['Earliest Case'] . "</td>";
        echo "<td style='padding: 0.3rem 0.5rem;'>" . $rowitem['Latest Case'] . "</td>";
        echo "</tr>";
      }
      echo "</table>";
    } else { ?>
      <p>No results.</p>
    <?php }
    $connection->close();
  }?>
  </body>
</html>